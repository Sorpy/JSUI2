package libraryui.application.data.entity;

import libraryui.application.data.entity.base.PersistentNamed;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

@Data
public class UserGroup extends PersistentNamed implements GrantedAuthority {

    private String authority;

    private UserGroupStatus userGroupStatus;

    @Override
    public String getAuthority() {
        return this.authority;
    }
}
